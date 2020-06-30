Bazel CDK Clojure
=================

If you ever (?!) wanted to create an AWS Clojure Lambda with the CDK then this is the place to come! 

Requires Bazelisk / Yarn / OpenJDK 11, possibly other things. Tested on Mac OSX & Linux.

Various commands are setup in the package.json:

- build:  `bazel build //...`
- repl: `bazel run :repl`
- test: `bazel test //...`
- cdk:bootstrap: `bazel run :cdk -- bootstrap`
- cdk:deploy: `bazel run :cdk -- deploy LambdaStack`


Notes
=====

- Build the Lambda JAR and revel in its AOT'ed innards:
    
    ````
    $ bazel build //java/lambda:lambda_deploy.jar
    $ unzip -l dist/bin/java/lambda/lambda_deploy.jar | grep " lambda/" 
        0  01-01-2010 00:00   lambda/
     2149  01-01-2010 00:00   lambda/Handler.class
     1780  01-01-2010 00:00   lambda/handler$G__133handleRequest.class
     ...
    ````


- Bootstrap then Deploy the stack to AWS (assumes AWS admin credentials on the environment)

    ````
    $ yarn cdk:bootstrap && yarn cdk:deploy
    ...
