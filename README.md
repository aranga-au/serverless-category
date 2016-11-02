# serverless-category
Serverless Restful Microservice based on AWS Lambda

### Deployment
- clone the repo to your local computer.
- make zip file with content of the folder.
- upload to lambda (make note of urn)

need policy  which have correct assess rights
-check out the /deployment/aws-policy.json
#### note:
only required if you want to run the lambda on your own vpc
```
    {
      "Action": "ec2:*",
      "Effect": "Allow",
      "Resource": "*"
    }
 ```
