import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class AdaApi implements ICredentialType {
	name = 'adaApi';

	displayName = 'Ada API';

	icon: Icon = { light: 'file:../icons/ada.svg', dark: 'file:../icons/ada.dark.svg' };

	documentationUrl = 'https://www.npmjs.com/package/n8n-nodes-ada';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: { password: true },
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://ada.im/api',
			url: '/platform_api/VerifyApikey',
			method: 'POST',
			headers: {
				'Authorization': '={{$credentials.apiKey}}',
				'Content-Type': 'application/json',
			},
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					// 按你们接口返回结构修改 key 与 value
					message: 'Invalid API key',
					key: 'success',
					value: false,
				},
			},
		],
	};
}
