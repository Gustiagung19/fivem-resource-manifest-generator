import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "fivem-resource-manifest-generator" is now active!');

	const disposable = vscode.commands.registerCommand('fivem-resource-manifest-generator.fxmanifest', async () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;

		if (!workspaceFolders) {
			vscode.window.showErrorMessage('Please open a folder first.');
			return;
		}

		const manifestContent = `
-- Generate by FiveM Resource Manifest Generator (Gusti Agung)

-- [[ FX Information ]] --
fx_version 'cerulean'            -- (cerulean, bodacious, adamant, anthrax)
lua54 'yes'                      -- Enable runtime Lua 5.4
game 'gta5'                      -- Target game (gta5, gta4, rdr3)

-- [[ Resource Metadata ]] --
name 'gusti-resources-manifest'  -- Resource name
author 'Gusti Agung'             -- Creator name / developer team
version '1.0.0'                  -- Resource version
description 'Description of the resource'  -- Brief explanation of resources

-- [[ Shared Scripts ]] --
shared_scripts {
    -- Example: 'config.lua', 'shared/utils.lua'
}

-- [[ Client Scripts ]] --
client_scripts {
    -- Example: 'client/main.lua', 'client/*.lua'
}

-- [[ Server Scripts ]] --
server_scripts {
    -- Example: 'server/main.lua', 'server/*.lua'
}

-- [[ Dependencies ]] --
dependencies {
    -- Example: 'es_extended', 'qbcore'
}
		`.trim();
		const manifestUri = vscode.Uri.joinPath(workspaceFolders[0].uri, 'fxmanifest.lua');
		await vscode.workspace.fs.writeFile(manifestUri, Buffer.from(manifestContent, 'utf8'));

		vscode.window.showInformationMessage('fxmanifest.lua generated successfully!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
