# serverless-category
Serverless Restful Microservice based on AWS Lambda

### Deployment
clonse the report
make zip file with content of the folder.
upload on to lambda

need policy  which have correct assess rights
-check out the /deployment/aws-policy.json
note:
```
    {
      "Action": "ec2:*",
      "Effect": "Allow",
      "Resource": "*"
    }
    only required if you want to run the lambda on your own vpc
 ```