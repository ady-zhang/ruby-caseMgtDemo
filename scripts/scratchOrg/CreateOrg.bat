@REM Execute in Windows using: .\scripts\scratchOrg\CreateOrg.bat
@echo off
echo "*** Creating scratch Org..."
call sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias devCaseDEX602 -d 30
echo "*** Opening scratch Org..."
call sfdx force:org:open


