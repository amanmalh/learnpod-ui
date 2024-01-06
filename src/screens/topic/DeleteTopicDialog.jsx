import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteTopic } from "../../utils/api-utils";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Text,
} from "@chakra-ui/react";

const DeleteTopicDialog = ({ id, isOpen, setIsOpen }) => {
  const client = useQueryClient();
  const deleteMutation = useMutation(deleteTopic, {
    onSuccess: () => {
      document.getElementById("confirm-delete-topic").close();
      client.invalidateQueries(["goal"]);
    },
  });

  const handleDeleteConfirmClick = () => {
    deleteMutation.mutate(id);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Delete Topic </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text py="4">
            Warning! This will permanently remove this topic. If you still wish
            to proceed, please click on the Delete button.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            onClick={handleDeleteConfirmClick}
            type="submit"
            disabled={deleteMutation.isLoading}
            isLoading={deleteMutation.isLoading}
            loadingText="Deleting"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  return (
    <dialog id="confirm-delete-topic" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Topic</h3>
        <p className="py-4">
          Warning! This will permanently remove this topic. If you still wish to
          proceed, please click on the Delete button.
        </p>

        <div className="modal-action">
          <button onClick={handleDeleteConfirmClick} className="btn">
            {deleteMutation.isLoading && (
              <span className="loading loading-spinner text-primary"></span>
            )}
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteTopicDialog;
