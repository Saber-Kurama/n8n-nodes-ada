import type { INodeProperties, IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

const showOnlyForCompanies = {
	resource: ['data-visualization'],
};

export const dataVisualizationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCompanies,
		},
		options: [
			{
				name: 'Visualize JSON Data',
				value: 'visualizeJsonData',
        action: 'Visualize JSON data',
        routing: {
          request: {
            method: 'POST',
            url: '/platform_api/EchartsVisualization',
          },
          send: {
            preSend: [
              async function (this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
                // Ensure requestOptions.body exists and is an object
                const body: Record<string, unknown> =
                  requestOptions.body && typeof requestOptions.body === 'object'
                    ? (requestOptions.body as Record<string, unknown>)
                    : {};
                requestOptions.body = body;

                const value = body.input_json as unknown;
                if (typeof value === 'string') {
                  try {
                    const parsed = JSON.parse(value);
                    if (parsed !== null && typeof parsed === 'object') {
                      // Accept objects and arrays
                      body.input_json = parsed as Record<string, unknown>;
                    } else {
                      // Primitive -> coerce to empty object
                      body.input_json = {};
                    }
                  } catch {
                    body.input_json = {};
                  }
                } else if (value === undefined || value === null) {
                  body.input_json = {};
                } else if (typeof value === 'object') {
                  // Already object/array -> keep as is
                } else {
                  // number/boolean -> coerce to empty object
                  body.input_json = {};
                }

                return requestOptions;
              },
            ],
          },
        },
			},
		],
		default: 'visualizeJsonData',
	},
  {
    displayName: 'Input JSON Data',
    name: 'input_json',
    type: 'json',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForCompanies,
    },
    default: '{}',
    routing: {
			send: {
				type: 'body',
				property: 'input_json',
			},
		},
  },
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForCompanies,
    },
    default: '',
    routing: {
			send: {
				type: 'body',
				property: 'query',
			},
		},
  }
];
