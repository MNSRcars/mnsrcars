Select-String -Path "**\*.sql","supabase\**\*" -Pattern "profiles|user_roles|app_role|super_admin|agent" -CaseSensitive:$false |
  Select-Object -First 50 Path, LineNumber, Line