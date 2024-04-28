import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

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

  }
}
