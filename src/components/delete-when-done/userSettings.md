{
"editor.tabCompletion": "on",
"editor.suggest.localityBonus": true,
// "editor.fontLigatures": true,
"telemetry.enableCrashReporter": false,
"telemetry.enableTelemetry": false,
"editor.fontSize": 14,
// "editor.fontFamily": "Fira Mono, Menlo, Monaco, 'Courier New', monospace",
// Command Prompt
//"terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe"
// PowerShell
//"terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
// Git Bash//
"terminal.integrated.shell.windows": "D:\\Program Files HDD\\Git\\bin\\bash.exe",
//"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",

//Git Cmd //
//"terminal.integrated.shell.windows": "D:\\Program Files HDD\\Git\\git-cmd.exe"
/_ Bash on Ubuntu (on Windows)
"terminal.integrated.shell.windows": "C:\\Windows\\System32\\bash.exe"_/

//"terminal.integrated.shell.windows": "D:\\Program Files HDD\\Git\\bin\\bash.exe",
// Is git enabled"!important" C:\Program Files\Git\bin
"git.enabled": true,

// Path to the git executable"!important"
"git.path": "D:\\Program Files HDD\\Git\\bin\\git.exe",

//materliaze

"workbench.colorTheme": "Material Theme",
"workbench.iconTheme": "eq-material-theme-icons",
//end
"materialTheme.accent": "Orange",
"files.trimTrailingWhitespace": true,
"trailing-spaces.deleteModifiedLinesOnly": true,
//end

// other settings
// other settings
// "editor.tokenColorCustomizations": {
// "[Material Theme Darker]": {
// "comments": "#62a54d",

// }
// },
"window.zoomLevel": 0,
"workbench.colorCustomizations": {
"editor.background": "#242424fb",
// "editor.background": "#1a1a1a8a",
"editorGroup.border": "#353535",
"activityBar.border": "#5a5a5a",
"sideBar.border": "#474747",
"terminal.border": "#7e7e7e",
"editorOverviewRuler.border": "#383838"
},
//end
/_// Defining custom colors instead of default "Rainbow" for dark backgrounds.
// (Sorry: Changing them needs an editor restart for now!)_/
"indentRainbow.colors": [

"rgba(64,64,16,0.3)",

"rgba(32,64,32,0.3)",

"rgba(64,32,64,0.3)",

"rgba(16,48,48,0.3)",

"rgba(128,32,32,0.3)"

],

// The indent color if the number of spaces is not a multiple of "tabSize".
"indentRainbow.errorColor": "rgba(128,32,32,0.3)",
/_Notice: errorColor was renamed from error_color in earlier versions.
Skip error highlighting for RegEx patterns. For example, you may want to turn off the indent errors for JSDoc's valid additional space (disabled by default), or comment lines beginning with //_/

// Example of regular expression in JSON (note double backslash to escape characters)

"indentRainbow.ignoreLinePatterns": [

"/.*\\*.*/mg", // lines begining wit *//

"/.*\\/\\/.*/g" // lines begininning with //

],

/_Skip error highlighting for some or all languages. For example, you may want to turn off the indent errors for markdown and plaintext. Default is plaintext._/

"indentRainbow.ignoreErrorLanguages": ["markdown", "plaintext"],

"git.ignoreMissingGitWarning": true,
//end

"workbench.editor.highlightModifiedTabs": true,
"gitlens.keymap": "chorded",
"javascript.updateImportsOnFileMove.enabled": "always",
"gitlens.advanced.messages": {
"suppressShowKeyBindingsNotice": true
},

//end

"editor.formatOnSave": true,
"prettier.eslintIntegration": true

//end

// "window.zoomLevel": 0,
// "workbench.colorCustomizations": {
// "activityBar.background": "#3b3939",
// "activityBar.background": "#4e4961",
// "activityBar.background": "#3e3a4d",
// "activityBar.background": "#211f31",
// "activityBar.background": "#23283d",
// "activityBar.border": "#9185ff",
// "editorGroup.border": "#574edf",
// "sideBar.border": "#6073e0",
// "editor.background": "#1a1a1a8a",
// "menu.background": "#1a1a1afb",
// "menubar.selectionBackground":"#9185ff"
// },

/_ "workbench.colorCustomizations": {
"activityBar.background": "#1E2028",
"activityBar.border": "#1e2028",
"sideBar.background": "#1E2028",
"sideBar.border": "#1C1E26"
"activityBar.background": "#2f313d",
"activityBar.border": "#2a2d3a",
// "sideBar.border": "#ff393",
// "tab.hoverBorder": "#ff000"
// "diffEditor.border": "#ff000",
//"sideBar.background": "#333541",
"activityBar.background": "#2e2e2e",
"activityBar.border": "#363636",
"editorGroup.border": "#505050",
"sideBar.border": "#16171d"
},_/
//"editor.fontFamily": "Fira Mono, Menlo, Monaco, 'Courier New', monospace",
//"editor.fontFamily": "San Francisco Mono , monospace",
//"editor.fontFamily": "San Francisco Mono ,'Courier New' monospace",
//"editor.fontSize": 16,
}
