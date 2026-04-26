import boto3

def lambda_handler(event, context):
    # Create an EC2 client
    ec2 = boto3.client('ec2')

    # Get all running instances
    response = ec2.describe_instances()
    print(response)
    ins = []

    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            instance_id = instance['InstanceId']
            ins.append(instance_id)
            
            # Check if the 'start' tag exists and is set to 'false'
            start_tag = False
            for tag in instance.get('Tags', []):
                if tag['Key'] == 'start' and tag['Value'].lower() == 'false':
                    start_tag = True
                    break
            
            # If the 'start' tag is 'false', skip this instance
            if start_tag:
                print(f"Instance {instance_id} is tagged to not start.")
            else:
                # Start the instance
                ec2.start_instances(InstanceIds=[instance_id])
                print(f"Starting instance {instance_id}")
    
    return {
        'statusCode': 200,
        'body': 'EC2 instances started based on the "start" tag.',
        'ins': ins
    }