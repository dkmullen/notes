AWS CLI
May 17 - AWS S# and Cloudfront Deployment:

aws s3 sync /Users/dennis.mullen/Documents/knox-sites/aws/permits-dkm-2/dist s3://amazon-cloudfront-secure-static-site-s3bucketroot-16zzxa26ze873\?region\=us-east-1 --exclude "*.DS_Store*" --exclude "*.git*" --delete

aws s3 sync /Users/dennis.mullen/Documents/knox-sites/kcg-web-permitsubmit/dist s3://epw-permitsubmit.knoxcountytn.gov/ --exclude "*.DS_Store*" --exclude "*.git*" --delete

aws cloudfront create-invalidation --distribution-id E1OAIC68Z4XZPD --paths "/*"
-----

export AWS_PROFILE=dkm // Specify aws profile for the current terminal session
aws s3 ls s3:://my-bucket --profile dkm // Specify profile for one command


aws s3 ls s3://my-bucket

aws s3 cp s3://my-bucket/.myfile ./ // copy file to current dir


aws s3 sync ./ s3://my-bucket // sync but don't delete files which were removed in one location
aws s3 sync ./ s3://my-bucket --delete // DO delete those files



aws s3 rm s3://dkm-aws-general-storage --recursive // empty a bucket

aws s3 mb s3://my-bucket // makes bucket (with fairly public settings by default) 

-- Buckets are made in us-east-1 by default (from the cli) so I have to specify my region:
aws s3 mb s3://my-bucket --region us-east-2 

aws s3 rb s3://my-bucket // removes bucket

// To make a temporary link to share...(60 = 60 sec, default is one hour)
aws s3 presign s3://dkm-aws-general-storage/race1.csv --expires-in 60 --region us-east-2

-- Specifying the region seems to be a consequence of not using the 'default' aws profile. Since I go back and forth between two accounts, might be easiest to rename the one I am using as default (in ~/.aws/config and ~/.aws/credentials