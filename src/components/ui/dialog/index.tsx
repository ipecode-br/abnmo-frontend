import * as DialogPrimitive from '@radix-ui/react-dialog'
import React from 'react'

export function Dialog(
  props: Readonly<React.ComponentProps<typeof DialogPrimitive.Root>>,
) {
  return <DialogPrimitive.Root {...props} />
}

/* USAGE

  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger>
      Open Dialog
    </DialogTrigger>
    <DialogContainer>
      <DialogHeader icon={IconComponent}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>Optional description</DialogDescription>
      </DialogHeader>
      <DialogContent>
        Content here
      </DialogContent>
      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContainer>
  </Dialog>

*/
