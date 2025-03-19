import React, from 'react'
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog'

interface ConfirmDeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ isOpen, onClose, onConfirm }) => {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* <DialogTrigger /> */}
            <DialogContent className="w-96 p-6">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <p className="mb-4">Are you sure you want to delete this project?</p>
                <DialogFooter>
                    <button onClick={onClose} className="px-4 py-2 mr-4 bg-gray-300 rounded-md">
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose(); // Close the dialog after confirming
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                        Delete
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDeleteDialog