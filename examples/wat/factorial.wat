(module
    (func $factorial (param i32) (result i64)
    (local i64 i64)
    block  ;; label = @1
        block  ;; label = @2
        get_local 0
        i32.eqz
        br_if 0 (;@2;)
        get_local 0
        i64.extend_u/i32
        set_local 1
        i64.const 1
        set_local 2
        loop  ;; label = @3
            get_local 1
            get_local 2
            i64.mul
            set_local 2
            get_local 1
            i64.const -1
            i64.add
            tee_local 1
            i64.eqz
            i32.eqz
            br_if 0 (;@3;)
            br 2 (;@1;)
        end
        unreachable
        end
        i64.const 1
        set_local 2
    end
    get_local 2)
    (export "factorial" (func $factorial))
)