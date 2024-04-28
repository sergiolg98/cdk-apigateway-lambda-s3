import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const balanceStatusS3 = new s3.Bucket(this, 'balancestatuss3logicalid', {
      bucketName: 'balancestatus-0123'
    });
    

  }
}
