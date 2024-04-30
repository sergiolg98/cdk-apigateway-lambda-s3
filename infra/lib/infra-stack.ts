import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const balanceStatusS3 = new s3.Bucket(this, 'balancestatuss3logicalid', {
      bucketName: 'balancestatus-0123'
    });
    
    const iamBalanceStatusRole = new iam.Role(this, 'iambalancerole', {
      roleName: 'bankingLambdaRole',
      description: 'Role for Lambda to access S3 bucket',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'), // reference to the service the IAM role is used for
    });
    iamBalanceStatusRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));

    const lambdaFunction = new lambda.Function(this, 'lambdafunctionlogicalid', {
      handler: 'function.handler',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('../services'),
      role: iamBalanceStatusRole
    });

    const bankingRestApi = new apigateway.LambdaRestApi(this, 'bankingrestapilogicalId', {
      handler: lambdaFunction,
      restApiName: 'bankingrestapi',
      deploy: true,
      proxy: false,
    });
    const bankStatus = bankingRestApi.root.addResource('bankstatus');
    bankStatus.addMethod('GET');

  }
}
