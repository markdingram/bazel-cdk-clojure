package(default_visibility = ["//visibility:public"])

java_library(
    name = "clojure",
    resources = glob(["*.clj"]),
    runtime_deps = [
        "@maven//:cheshire_cheshire",
        "@maven//:com_cognitect_aws_api",
        "@maven//:com_cognitect_aws_endpoints",
        "@maven//:com_cognitect_aws_s3",
        "@maven//:uswitch_lambada",
    ],
)

# this is the only way to add the lib sources to the plugin classpath - this can be hidden in a macro easily enough
java_plugin(
    name = "aot",
    deps = [":clojure"],
)

java_binary(
    name = "lambda",
    srcs = [":handler/package-info.java"],
    create_executable = False,
    plugins = [
        ":aot",
        "//java/tools/aot",
    ],
    deps = [
        ":clojure",
        "//java/tools/aot",
    ],
)
