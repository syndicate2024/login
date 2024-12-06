# List all backup and temporary files
Get-ChildItem -Path . -Recurse -File | 
    Where-Object { 
        $_.Name -like "*backup*" -or 
        $_.Name -like "*.bak" -or 
        $_.Name -like "*.tmp" -or 
        $_.Name -like "*copy*" -or
        $_.Name -like "*.ps1"
    } | 
    Select-Object FullName 