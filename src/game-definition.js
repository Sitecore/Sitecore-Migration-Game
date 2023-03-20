export let gameDefinition = {
  roomId: 'waitingRoom',
  inventory: [],
  rooms: [
    {
      name: 'The Waiting Room',
      id: 'waitingRoom',
      img: `
           ~~~       ~~~
             1         1
          !!!!!!!   !!!!!!!
          !     !   !     !
      !!!!!  #  !!!!!  #  !!!!!
      !   !  #  !   !  #  !   !
      ! # !  #  !   !  #  ! # !
      !   !     !   !     !   !
      !   !     !###!     !   !
      ! # ! ### !###! ### ! # !
      ! # ! ### !###! ### ! # !
      ! # ! ### !###! ### ! # !
  """""""""""""""""""""""""""""""""
        `,
      desc: ` Welcome Sitecore traveler, as you journey into the world of composability, at any point on your
          journey, you can **STARTOVER** to start over from the beginning. You can also **HELP** to see a list of commands.
        `,
      items: [{ name: 'castle', desc: "It's quite impressive." }],
      exits: [{ dir: 'north', id: 'endOfTheWorld' }],
    },
    {
      name: 'The End of the World',
      id: 'endOfTheWorld',
      img: `
     xx    ~~~       ~~~
       xxxxx 1         1
          x1!!!!! 0 !!!!!!!
          x1    !  0000000000
      !!xx!11#  !xx000000000000
      ! x x11x000 00!00000!   !
      !xxx!110  0 x !  0  ! # !
      !   !1111 0 x !  0  !   !
      !   0 1 1 0#x#!   00!   !
      ! #0! #1# 0##x00011111# !
      ! 00! #11 0000!11111!000!
      ! # ! ### !###! 1111111100
  """""""""""""""""""""""00000100"""""
        `,
      desc: `
          I don't know how you got here, but you definitely don't belong here. This is the End of the World. You already saved the k†ngdøm. It's time for you to leave.
        `,
      items: [
        {
          name: 'key',
          desc: 'It looks like a key.',
          isTakeable: true,
          use: ({ disk, println, getRoom }) => {
            const room = getRoom(disk.roomId);
            const door = room.items.find((item) => item.name === 'door');
            if (door) {
              println('The door has opened!');
              door.isOpen = true;
            } else {
              println("There's nothing to use the key on.");
            }
          },
        },
        {
          name: 'book',
          desc: 'It appears to contain some sort of encantation, or perhaps... code.',
          isTakeable: true,
          use: ({ disk, println, getRoom }) => {
            const room = getRoom(disk.roomId);
            const door = room.items.find((item) => item.name === 'door');

            if (door) {
              println('You already used the book!');
              return;
            }

            println('A door has appeared from nothing! It seems to go nowhere...');
            room.items.push({
              name: 'door',
              desc: 'It seems to go nowhere...',
              isOpen: false,
              use: ({ disk, println, enterRoom }) => {
                const door = room.items.find((item) => item.name === 'door');
                if (door.isOpen) {
                  enterRoom('gameReallyOver');
                } else {
                  println('The door is locked.');
                }
              },
            });
          },
        },
        { name: 'castle', desc: 'It has been... corrupted somehow.' },
      ],
    },
    {
      name: 'GAME REALLY OVER',
      id: 'gameReallyOver',
      img: '¯\\_(ツ)_/¯',
      desc: `
          That's all I've written so far! If you liked this and want more, write me on Twitter: @okaybenji
        `,
    },
  ],
};
