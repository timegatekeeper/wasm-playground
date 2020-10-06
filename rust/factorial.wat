(module
  (type $t0 (func (param i32) (result i32)))
  (func $factorial (type $t0) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32)
    block $B0
      local.get $p0
      br_if $B0
      i32.const 1
      return
    end
    i32.const 1
    local.set $l1
    loop $L1
      local.get $l1
      local.get $p0
      i32.mul
      local.set $l1
      local.get $p0
      i32.const -1
      i32.add
      local.tee $l2
      local.set $p0
      local.get $l2
      br_if $L1
    end
    local.get $l1)
  (table $T0 1 1 funcref)
  (memory $memory 16)
  (global $g0 (mut i32) (i32.const 1048576))
  (global $__data_end i32 (i32.const 1048576))
  (global $__heap_base i32 (i32.const 1048576))
  (export "memory" (memory 0))
  (export "factorial" (func $factorial))
  (export "__data_end" (global 1))
  (export "__heap_base" (global 2)))
