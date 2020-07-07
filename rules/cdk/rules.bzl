def _runfiles(dep):
    return depset(transitive = dep[DefaultInfo].data_runfiles)

def _impl(ctx):
    cdk_out = ctx.actions.declare_directory("cdk.out")

    inputs = ctx.files.data

    ctx.actions.run(
        outputs = [cdk_out],
        inputs = inputs,
        arguments = [],
        env = {
            "CDK_OUTDIR": cdk_out.path,
            "GENDIR": ctx.genfiles_dir.path
        },
        progress_message = "Synthing into %s" % cdk_out.short_path,
        executable = ctx.executable.cdk_app,
    )
    return [DefaultInfo(files = depset([cdk_out]))]

synth = rule(
    implementation = _impl,
    attrs = {
        "cdk_app": attr.label(
            executable = True,
            cfg = "host",
            allow_files = True
        ),
        "data": attr.label_list(allow_files = True, providers = [DefaultInfo]),
    }
)
