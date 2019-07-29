Demo repo for https://github.com/bazelbuild/rules_nodejs/issues/871

## Issue

Packages in yarn workspaces are symlinked in the node_modules folder, causing
an auto-removing `BUILD.bazel` file when the bazel workspace is configured with
`yarn_install`.

## Example

1. Test with `npm_install`, example output:
    ```
    $ bazel build //packages/component1:@myorg/component1 //packages/component2:@myorg/component2 
    Starting local Bazel server and connecting to it...
    INFO: Analyzed 2 targets (60 packages loaded, 850 targets configured).
    INFO: Found 2 targets...
    INFO: Deleting stale sandbox base /dev/shm/bazel-sandbox.97e3348635132ef4acbb5fe3f5c35b97
    INFO: Elapsed time: 61.713s, Critical Path: 3.52s
    INFO: 4 processes: 2 local, 2 worker.
    INFO: Build completed successfully, 17 total actions
    
    $ ls -la node_modules/@myorg/
    ls: cannot access 'node_modules/@myorg/': No such file or directory
    ```
2. Clean:
    ```
    rm -rf node_modules/
    bazel clean --expunge --async
    ```
3. Edit `WORKSPACE` to switch `npm_install` &rarr; `yarn_install`
4. Test with `yarn_install`:
    ```
    $ bazel build //packages/component1:@myorg/component1 //packages/component2:@myorg/component2 
    Starting local Bazel server and connecting to it...
    ERROR: Skipping '//packages/component1:@myorg/component1': no such package 'packages/component1': BUILD file not found in any of the following directories.
     - /home/vagrant/Projects/bazel-components-repo/packages/component1
    ERROR: no such package 'packages/component1': BUILD file not found in any of the following directories.
     - /home/vagrant/Projects/bazel-components-repo/packages/component1
    INFO: Elapsed time: 15.992s
    INFO: 0 processes.
    FAILED: Build did NOT complete successfully (0 packages loaded)
    
    $ ls -la node_modules/@myorg
    ls -la node_modules/@myorg/
    total 24
    drwxrwxr-x   2 vagrant vagrant  4096 Jul 29 12:52 .
    drwxrwxr-x 592 vagrant vagrant 20480 Jul 29 12:52 ..
    lrwxrwxrwx   1 vagrant vagrant    25 Jul 29 12:52 component1 -> ../../packages/component1
    lrwxrwxrwx   1 vagrant vagrant    25 Jul 29 12:52 component2 -> ../../packages/component2
    
    $ git status
    On branch master
    Changes not staged for commit:
      (use "git add/rm <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)
    
    	deleted:    packages/component1/BUILD.bazel
    	deleted:    packages/component2/BUILD.bazel
    
    Untracked files:
      (use "git add <file>..." to include in what will be committed)
    
    	packages/component1/_BUILD.bazel
    	packages/component2/_BUILD.bazel
    
    no changes added to commit (use "git add" and/or "git commit -a")
    ```