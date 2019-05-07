// define our lang-lang source file and export as "sauce"

const sauce = `

call first_function
log alittlestring
call first_function
log blittlestring
stop

// :: first_function
log in_first_function_yay
back

`;

const sauce2 = `

route ArrowLeft leftHandle
route ArrowRight rightHandle
route ArrowUp upHandle
route ArrowDown downHandle

route ~blink~ blinkHandle

mov 7 N

loop 1 N

cp N k
sub %1 k k
add 1 k k
mov k snk./%1/.x
mov 1 snk./%1/.y

pool

mov 180 grey
black
loop 1 N
  draw grey snk./%1/.x snk./%1/.y
pool

mov 1 state


stop


mov 1 state :: rightHandle
stop

mov 2 state :: leftHandle
stop

mov 3 state :: upHandle
stop

mov 4 state :: downHandle
stop

// :: blinkHandle

cp snk.1.x x
cp snk.1.y y

if state == 1
  add 1 x x
fi
if state == 2
  sub 1 x x
fi
if state == 3
  add 1 y y
fi
if state == 4
  sub 1 y y
fi



sub 1 N p
loop 1 p

sub %1 N r
add 1 r s
mov snk./r/ snk./s/

pool




mov x snk.head.x
mov y snk.head.y
mov snk.head snk.1

black
loop 1 N
  draw grey snk./%1/.x snk./%1/.y
pool

stop

`
	
		
console.log(`The sauce:`);
console.log(sauce);