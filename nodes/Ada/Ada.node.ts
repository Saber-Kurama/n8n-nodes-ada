import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
// import { userDescription } from './resources/user';
// import { companyDescription } from './resources/company';
import { dataAnalysisDescription } from './resources/data-analysis';
import { dataInterpretationDescription } from './resources/data-interpretation';
import { dataVisualizationDescription } from './resources/data-visualization';

export class Ada implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ada',
		name: 'ada',
		icon: { light: 'file:../../icons/ada.svg', dark: 'file:../../icons/ada.dark.svg' },
		group: ['transform'],
		defaultVersion: 1,
		version: [1],
		// subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		subtitle: '',
		description: 'Interact with the Ada API',
		defaults: {
			name: 'Ada',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'adaApi', required: true }],
		requestDefaults: {
			baseURL: 'https://ada.im/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: {
				platform: 'n8n',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Data Analysis',
						value: 'data-analysis',
					},
					{
						name: 'Data Interpretation',
						value: 'data-interpretation',
					},
					{
						name: 'Data Visualization',
						value: 'data-visualization',
					},
				],
				default: 'data-analysis',
			},
			// ...userDescription,
			// ...companyDescription,
			...dataAnalysisDescription,
			...dataInterpretationDescription,
			...dataVisualizationDescription,
		],
	};
}
