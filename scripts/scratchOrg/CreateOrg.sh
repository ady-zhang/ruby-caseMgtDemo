# Execute in Mac using: ./scripts/scratchOrg/CreateOrg.sh
echo "*** Creating scratch Org..."
sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias devCaseDEX602 -d 30
echo "*** Opening scratch Org..."
sfdx force:org:open

