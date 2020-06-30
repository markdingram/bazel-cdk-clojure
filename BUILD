# Add rules here to build your software
# See https://docs.bazel.build/versions/master/build-ref.html#BUILD_files

# Allow any ts_library rules in this workspace to reference the config
# Note: if you move the tsconfig.json file to a subdirectory, you can add an alias() here instead
#   so that ts_library rules still use it by default.
#   See https://www.npmjs.com/package/@bazel/typescript#installation
exports_files(
    [
        "tsconfig.json"
    ],
    visibility = ["//visibility:public"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

nodejs_binary(
    name = "cdk",
    data = [
        "cdk.json",
        "tsconfig.json",
        "//infra:app",
        "@npm//aws-cdk",
    ],
    entry_point = "@npm//:node_modules/aws-cdk/bin/cdk",
    visibility = ["//visibility:public"],
)


# Clojure Socket REPL

REPL_PORT = 5555
java_binary(
    name = "repl",
    args = [
        "-e",
        """\"(require '[{ns}]) (in-ns '{ns}) (clojure.main/repl)\"""".format(ns = "user"),
    ],
    jvm_flags = ['-Dclojure.server.repl="{:port %s,:accept clojure.core.server/repl}"' % REPL_PORT],
    main_class = "clojure.main",
    testonly = True,
    runtime_deps = [
        "//dev",
        "//java/lambda:clojure",
        "//javatests/lambda",
        "@maven//:org_clojure_clojure",
        "@maven//:org_clojure_core_specs_alpha",
        "@maven//:org_clojure_spec_alpha",
    ],
)
