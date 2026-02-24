# Script to fix all params in Next.js 15 - params must be awaited

$files = @(
    "app\[brand]-repair\page.tsx",
    "app\[city]\page.tsx",
    "app\[city]\[appliance]-repair\page.tsx",
    "app\[city]\[brand]\[appliance]-repair\page.tsx",
    "app\commercial\[appliance]-repair\page.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file"
        
        # Read content
        $content = Get-Content $file -Raw
        
        # Fix params interface
        $content = $content -replace 'params: \{', 'params: Promise<{'
        $content = $content -replace '  \};\s*\}', '  }>;\n}'
        
        # Fix async function
        $content = $content -replace 'export default function', 'export default async function'
        
        # Fix generateMetadata
        $content = $content -replace 'export async function generateMetadata\(\{ params \}: PageProps\): Promise<Metadata> \{', 'export async function generateMetadata({ params }: PageProps): Promise<Metadata> {'
        
        # Save
        Set-Content $file -Value $content
        Write-Host "Fixed: $file"
    }
}

Write-Host "Done!"



