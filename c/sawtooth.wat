(module
  (type $t0 (func))
  (type $t1 (func (param i32) (result i32)))
  (func $__wasm_call_ctors (type $t0))
  (func $update (type $t1) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32)
    global.get $g0
    local.set $l1
    i32.const 16
    local.set $l2
    local.get $l1
    local.get $l2
    i32.sub
    local.set $l3
    local.get $l3
    local.get $p0
    i32.store offset=12
    i32.const 0
    local.set $l4
    local.get $l4
    i32.load offset=1028
    local.set $l5
    i32.const 0
    local.set $l6
    local.get $l6
    i32.load offset=1024
    local.set $l7
    local.get $l5
    local.get $l7
    i32.div_s
    local.set $l8
    i32.const 8
    local.set $l9
    local.get $l8
    local.get $l9
    i32.rem_s
    local.set $l10
    local.get $l3
    local.get $l10
    i32.store offset=8
    i32.const 0
    local.set $l11
    local.get $l11
    i32.load offset=1028
    local.set $l12
    i32.const 1
    local.set $l13
    local.get $l12
    local.get $l13
    i32.add
    local.set $l14
    i32.const 0
    local.set $l15
    local.get $l15
    local.get $l14
    i32.store offset=1028
    local.get $l3
    i32.load offset=8
    local.set $l16
    local.get $l16
    return)
  (table $T0 1 1 funcref)
  (memory $memory 2)
  (global $g0 (mut i32) (i32.const 66576))
  (global $counter i32 (i32.const 1028))
  (global $stepsToTurn i32 (i32.const 1024))
  (global $__dso_handle i32 (i32.const 1024))
  (global $__data_end i32 (i32.const 1032))
  (global $__global_base i32 (i32.const 1024))
  (global $__heap_base i32 (i32.const 66576))
  (global $__memory_base i32 (i32.const 0))
  (global $__table_base i32 (i32.const 1))
  (export "memory" (memory 0))
  (export "__wasm_call_ctors" (func $__wasm_call_ctors))
  (export "update" (func $update))
  (export "counter" (global 1))
  (export "stepsToTurn" (global 2))
  (export "__dso_handle" (global 3))
  (export "__data_end" (global 4))
  (export "__global_base" (global 5))
  (export "__heap_base" (global 6))
  (export "__memory_base" (global 7))
  (export "__table_base" (global 8))
  (data $d0 (i32.const 1024) "\0a\00\00\00"))
