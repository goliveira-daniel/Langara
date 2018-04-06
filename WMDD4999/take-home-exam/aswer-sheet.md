Answer sheet
=============

**Q - Research and write about 2 paragraphs describing how you could use the AWS tools SNS and SQS to aide in handling messages between services in a microservices architecture.**
A - With both tools it's possible to implement the 'fanout' design pattern, in which a message published to an SNS topic is distributed to a number of SQS queues in parallel.

By using this pattern, you can build applications that take advantage parallel, asynchronous processing. Other advantages are  decreased latency time, as SNS immediattelly pushes messages to subscribers and the possibility to decouple each step of your process in an independent program on the SQS queue, allowing smaller and reusable code.

**Q - Research two alternative frameworks to the Serverless framework that we looked at in class. These should be frameworks for working with microservices and serverless(the architecture not the framework). Write about 2 paragraphs on each of them. What do they offer, if anything that is different from the Serverless framework...?**
A - [Arc](https://arc.codes/) is a framework that views infrastructure as a build artifact. It defines a high level vendor agnostic plaintext format, .arc, as a manifest file. As pointed in the framework's website, the .arc is also entirely portable between cloud vendors, however no ports to clouds other than AWS have been made as of today.

The manifest file has its own syntax to describe functions and resources. Once you're done describing what you'll use in your project, you run a ```NPM RUN CREATE``` to create your structure locally and deploy it to AWS. Subsequent changes on your assets are deployed with ```NPM RUN DEPLOY```.

[Up](https://up.docs.apex.sh/) seems to be a very light framework to manage serverless architecture. It supports Node.js, Golang, Python, Java, Crystal, and static sites out of the box. Up says to be platform-agnostic, but as the writing of this document, it only supports AWS Lambda and API Gateway as the first targets. Up also has a paid Pro version that extends functionalities of its vanilla version. 

The main advantage of Up against its competitors is that it's not function-oriented, but rather creates regular HTTP servers for every function that you create. It does that to keep the apps and APIs portable, make local testing easier, and prevent vendor lock-in.

##Small project
Using what you have learned this term about serverless/microservices, the Serverless framework, and the AWS tools used in class (Lambda, S3, DynamoDB) you are going to create part of the backend for a streaming music app, similar to Spotify.

You will code the following microservices (remember that these are functions):

1. A services that adds all of your audio files in an S3 bucket to a DynamoDB database.

2. A service that allows a user to search for a song(the name of the file) or returns a list of all of the songs(files) you have in your S3 bucket.

3. A service that allows you to create a new playlist and add a song to that playlist.(You might want to use a second DynamoDB table for this)

For the purposes of this assignment I recommend making several small txt files to stand in for your MP3s/OGG(other audio files)

As in the previous project you can add a few files to your S3 bucket using the AWS web console for testing purposes