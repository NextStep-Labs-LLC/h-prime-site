#!/usr/bin/env node

/**
 * Script to download original brand logos from Brandfetch API
 * Usage: node scripts/download-brand-logos.mjs
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Brand domains mapping
const BRAND_DOMAINS = {
  'lg': 'lg.com',
  'samsung': 'samsung.com',
  'whirlpool': 'whirlpool.com',
  'ge-appliances': 'geappliances.com',
  'ge': 'ge.com',
  'maytag': 'maytag.com',
  'bosch': 'bosch-home.com',
  'kitchenaid': 'kitchenaid.com',
  'frigidaire': 'frigidaire.com',
  'electrolux': 'electrolux.com',
  'kenmore': 'kenmore.com',
  'amana': 'amana.com',
  'sub-zero': 'subzero-wolf.com',
  'viking': 'vikingrange.com',
  'thermador': 'thermador.com',
  'miele': 'miele.com',
  'haier': 'haier.com',
  'jennair': 'jennair.com',
  'ge-profile': 'geappliances.com',
  'dacor': 'dacor.com',
  'wolf': 'subzero-wolf.com',
  'fisher-paykel': 'fisherpaykel.com',
  'smeg': 'smeg.com',
  'speed-queen': 'speedqueen.com',
  'hotpoint': 'hotpoint.com',
  'sharp': 'sharp.com',
  'true': 'truemfg.com',
  'scotsman': 'scotsman-ice.com',
  'u-line': 'u-line.com',
  'perlick': 'perlick.com',
  'liebherr': 'liebherr.com',
  'bertazzoni': 'bertazzoni.com',
  'blomberg': 'blombergappliances.com',
  'asko': 'askousa.com',
  'gaggenau': 'gaggenau.com',
  'jenn-air': 'jennair.com',
};

// Brandfetch API (free tier: 100 requests/month)
const BRANDFETCH_API = 'https://api.brandfetch.io/v2/brands/';

// Clearbit API (free, no key needed)
const CLEARBIT_API = 'https://logo.clearbit.com/';

async function downloadFromBrandfetch(domain, slug) {
  try {
    console.log(`🔍 Fetching ${slug} from Brandfetch...`);
    const response = await fetch(`${BRANDFETCH_API}${domain}`);
    
    if (!response.ok) {
      throw new Error(`Brandfetch API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Find logo URL (prefer PNG, fallback to SVG)
    let logoUrl = null;
    
    if (data.logos && data.logos.length > 0) {
      // Try to find PNG logo
      const pngLogo = data.logos.find(logo => 
        logo.formats?.some(format => format.format === 'png')
      );
      
      if (pngLogo) {
        const pngFormat = pngLogo.formats.find(f => f.format === 'png');
        logoUrl = pngFormat?.src;
      } else {
        // Fallback to first available logo
        logoUrl = data.logos[0].formats?.[0]?.src;
      }
    }
    
    if (!logoUrl) {
      throw new Error('No logo found in Brandfetch response');
    }
    
    return logoUrl;
  } catch (error) {
    console.log(`⚠️  Brandfetch failed for ${slug}: ${error.message}`);
    return null;
  }
}

async function downloadFromClearbit(domain, slug) {
  try {
    console.log(`🔍 Fetching ${slug} from Clearbit...`);
    const logoUrl = `${CLEARBIT_API}${domain}?size=200`;
    
    const response = await fetch(logoUrl);
    if (!response.ok) {
      throw new Error(`Clearbit API error: ${response.status}`);
    }
    
    return logoUrl;
  } catch (error) {
    console.log(`⚠️  Clearbit failed for ${slug}: ${error.message}`);
    return null;
  }
}

async function downloadLogo(logoUrl, outputPath) {
  const response = await fetch(logoUrl);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status}`);
  }
  
  const buffer = await response.arrayBuffer();
  await writeFile(outputPath, Buffer.from(buffer));
}

async function main() {
  const outputDir = join(__dirname, '..', 'public', 'brands');
  
  // Create output directory if it doesn't exist
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }
  
  console.log('🚀 Starting brand logo download...\n');
  
  let successCount = 0;
  let failedCount = 0;
  const failed = [];
  
  for (const [slug, domain] of Object.entries(BRAND_DOMAINS)) {
    const outputPath = join(outputDir, `${slug}.png`);
    
    // Skip if already exists
    if (existsSync(outputPath)) {
      console.log(`✅ ${slug}.png already exists, skipping...`);
      successCount++;
      continue;
    }
    
    try {
      // Try Brandfetch first (better quality)
      let logoUrl = await downloadFromBrandfetch(domain, slug);
      
      // Fallback to Clearbit if Brandfetch fails
      if (!logoUrl) {
        logoUrl = await downloadFromClearbit(domain, slug);
      }
      
      if (logoUrl) {
        await downloadLogo(logoUrl, outputPath);
        console.log(`✅ Downloaded ${slug}.png`);
        successCount++;
        
        // Rate limiting: wait 500ms between requests
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        throw new Error('No logo source available');
      }
    } catch (error) {
      console.log(`❌ Failed to download ${slug}: ${error.message}`);
      failedCount++;
      failed.push({ slug, domain, error: error.message });
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failedCount}`);
  
  if (failed.length > 0) {
    console.log('\n⚠️  Failed downloads:');
    failed.forEach(({ slug, domain }) => {
      console.log(`   - ${slug} (${domain})`);
      console.log(`     Manual download: https://${domain}`);
    });
    
    console.log('\n💡 Tip: You can manually download these logos from brand press kits:');
    console.log('   1. Visit brand\'s official website');
    console.log('   2. Look for "Press" or "Media" section');
    console.log('   3. Download official logo (PNG format)');
    console.log('   4. Save as: public/brands/{slug}.png');
  }
}

main().catch(console.error);



