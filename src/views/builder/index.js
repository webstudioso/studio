/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "editor";
import Modal from "views/modal";
import { Magic } from 'magic-sdk';
import { useDispatch } from "react-redux";
import { LOADER, SNACKBAR_OPEN } from "store/actions";
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

const EditorView = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [editor, setEditor] = useState();
	const [principal, setPrincipal] = useState();
	const [eventName, setEventName] = useState();

	const handleEvent =  (event) =>  {
		setEventName(event.type);
		setEditor(event.detail)
	}

	const handleAssetUploadStart = () => {
		dispatch({ type: LOADER, show: true });
	}

	const handleAssetUploadEnd = () => {
		dispatch({ type: LOADER, show: false });
		dispatch({
			type: SNACKBAR_OPEN,
			open: true,
			message: "Uploaded",
			variant: "alert",
			anchorOrigin: { vertical: "bottom", horizontal: "right" },
			alertSeverity: "success"
		});
	}

	const handleAssetUploadError = () => {
		dispatch({ type: LOADER, show: false });
		dispatch({
			type: SNACKBAR_OPEN,
			open: true,
			message: "Upload failed, please reach out to contact@webstudio.so for help",
			variant: "alert",
			anchorOrigin: { vertical: "bottom", horizontal: "right" },
			alertSeverity: "error"
		});
	}

	const addEditorListeners = () => {
		document.addEventListener('toggleTemplates', handleEvent);
		document.addEventListener('toggleLaunch', handleEvent);
		document.addEventListener('toggleUsers', handleEvent);
		// Modal assets
		document.addEventListener('assetUploadStart', handleAssetUploadStart);
		document.addEventListener('assetUploadEnd', handleAssetUploadEnd);
		document.addEventListener('assetUploadError', handleAssetUploadError);
	};

	const loadPrincipal = async () => {
		// 6 hour session in editor
		const idToken = await m.user.getIdToken({ lifespan: 21600 });
		setPrincipal(idToken);
	};

	const onClickHome = () => {
		navigate("/profile/projects", { replace: true });
	};

	useEffect(() => {
		addEditorListeners();
		loadPrincipal();
		return () => {
			document.removeEventListener('toggleTemplates', () => {});
			document.removeEventListener('toggleLaunch', () => {});
			document.removeEventListener('toggleUsers', () => {});
			document.removeEventListener('assetUploadStart', () => {});
			document.removeEventListener('assetUploadEnd', () => {});
			document.removeEventListener('assetUploadError', () => {});
		}
	},[]);

	const handleClose = () => {
		setEditor();
		setEventName();
	};

	return (
		<>
			{principal && (<Editor projectId={projectId} onClickHome={onClickHome} principal={principal} />)}
			<Modal  open={!!editor} 
					handleClose={handleClose} 
					editor={editor} 
					event={eventName} 
					principal={principal}
					projectId={projectId}
			/>
		</>
	);
};

export default EditorView;
