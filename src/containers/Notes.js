import { s3Upload } from "../libs/awsLib";
import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { Form } from "react-bootstrap"; // Assuming you are using react-bootstrap for form controls
import LoaderButton from "../components/LoaderButton"; // A component to show loading state on buttons
import { config } from "../config"; // Assuming you have a config file with MAX_ATTACHMENT_SIZE

export default function Notes() {
  const file = useRef(null);
  const { id } = useParams(); // Getting the note ID from URL params
  const history = useHistory(); // Navigation history
  const [note, setNote] = useState(null); // State to hold the note object
  const [content, setContent] = useState(""); // State to hold the note's content
  const [attachmentURL, setAttachmentURL] = useState(""); // State for the attachment URL
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission
  const [isDeleting, setIsDeleting] = useState(false); // Loading state for deletion

  useEffect(() => {
    async function loadNote() {
      return API.get("notes", `/notes/${id}`); // API call to fetch note data
    }

    async function onLoad() {
      try {
        const noteData = await loadNote();
        const { content, attachment } = noteData;

        if (attachment) {
          const attachmentURL = await Storage.vault.get(attachment); // Fetch attachment URL if exists
          setAttachmentURL(attachmentURL);
        }

        setContent(content); // Set the note content
        setNote(noteData); // Set the full note data
      } catch (e) {
        onError(e); // Handle errors if API call fails
      }
    }

    onLoad(); // Call the onLoad function when the component mounts or ID changes
  }, [id]);

  function validateForm() {
    return content.length > 0; // Validate the form to make sure content is entered
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, ""); // Format the filename by removing the prefix
  }

  function handleFileChange(event) {
    file.current = event.target.files[0]; // Store the file when the user selects one
  }

  function saveNote(note){
    returnAPI.put("notes", `/notes/${id}`,{
    body: note
    });
    }
    asyncfunction handleSubmit(event){
    letattachment;
    event.preventDefault();
    if(file.current&& file.current.size >config.MAX_ATTACHMENT_SIZE){
    alert(
    `Pleasepickafilesmaller than ${
    config.MAX_ATTACHMENT_SIZE/ 1000000
    } MB.`
    );
    return;
    }
    setIsLoading(true);
    try{
    if(file.current){
    attachment =await s3Upload(file.current);
    }
    await saveNote({
        content,
        attachment: attachment || note.attachment
        });
        history.push("/");
        } catch (e) {
        onError(e);
        setIsLoading(false);
        }
        }
        function deleteNote(){
            returnAPI.del("notes", `/notes/${id}`);
            }
            asyncfunction handleDelete(event){
            event.preventDefault();
            constconfirmed =window.confirm(
            "Areyousureyouwanttodeletethisnote?"
            );
            if(!confirmed){
            return;
            }
            setIsDeleting(true);
            try{
            awaitdeleteNote();
            history.push("/");
            } catch(e){
            onError(e);
            setIsDeleting(false);
            }
            }
  

  return (
    <div className="Notes">
      {note && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>Attachment</Form.Label>
            {note.attachment && (
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </p>
            )}
            <Form.Control onChange={handleFileChange} type="file" />
          </Form.Group>
          <LoaderButton
            block
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  );
}
