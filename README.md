
<p align="center" style="background-color:gray">
  <img src="https://github.com/tiffanytangt/garden-buddy/assets/12769383/797e985d-442d-491c-a5d2-0f7a52c715dc">
</p>

## Garden Buddy

Preview the app [here](http://garden-buddy.tiffanytang.tech)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### What I'm working on:
- Tech choices: library and infrastructure choices
- App Foundations: data model and CRUD ops for plants
  
#### What's next?
- Organizing plants into collections
- Reminders and Journal Entries
- Calendar
- Deployment pipeline

#### What's the goal?
A responsive, easy-to-use gardening assistant to help track of gardening tasks and plant progress.

## Built With
<img height="55" alt="image" src="https://github.com/tiffanytangt/garden-buddy/assets/12769383/1f60741d-dcb2-494f-9c72-ac65bb12c379">
<img height="50" alt="image" src="https://github.com/tiffanytangt/garden-buddy/assets/12769383/95773d85-7a74-49a1-9a43-feccad1893be">
<img height="50" alt="image" src="https://github.com/tiffanytangt/garden-buddy/assets/12769383/a46cab59-731e-4d65-878b-2f7e53a0afe6">
<br>
<img height="40" alt="image" src="https://github.com/tiffanytangt/garden-buddy/assets/12769383/c41650ad-15a8-41af-b743-217655bcbcd9">
<img height="30" alt="image" src="https://github.com/tiffanytangt/garden-buddy/assets/12769383/8546feaa-7b40-4800-9bdf-5f05849970ae">

- AWS S3 for persisting user uploads
- MySQL as data store

## Run locally
Environment variables:
```
DATABASE_URL="mysql://<user>:<host>:<port>/<database>"
NEXT_PUBLIC_AWS_REGION="<aws_region>"
NEXT_PUBLIC_AWS_BUCKET_NAME="<s3_bucket>"
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=<aws_access_key>
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=<aws_secret_access_key>
NEXT_AUTH_URL=<public_hostname>
```

Start dev server:
```bash
npm run dev
```


