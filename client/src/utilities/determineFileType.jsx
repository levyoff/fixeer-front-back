import {
  faFile,
  faFileImage,
  faFileExcel,
  faFilePdf,
  faFileWord,
  faFileZipper,
  faFileAudio,
  faFileVideo,
  faFileCode,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';

//Modificación de fecha
const formDate = (date) =>{
  const formatDate = new Date(date).toLocaleDateString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  return formatDate;
}


const determineFileType = (fileName) => {
 // debugger;
  const fileExtension = fileName?.split('.').pop();
  const fileType = {
    pdf: faFilePdf,
    avi: faFileVideo,
    mp4: faFileVideo,
    mpeg: faFileVideo,
    mwv: faFileVideo,
    mp3: faFileAudio,
    wav: faFileAudio,
    wma: faFileAudio,
    flac: faFileAudio,
    doc: faFileWord,
    docx: faFileWord,
    txt: faFileWord,
    xls: faFileExcel,
    xlsx: faFileExcel,
    jpg: faFileImage,
    jpeg: faFileImage,
    png: faFileImage,
    gif: faFileImage,
    bmp: faFileImage,
    svg: faFileImage,
    rar: faFileZipper,
    zip: faFileZipper,
    tar: faFileZipper,
    '7z': faFileZipper,
    js: faFileCode,
    jsx: faFileCode,
    html: faFileCode,
    css: faFileCode,
    json: faFileCode,
    iso: faFloppyDisk,
    mds: faFloppyDisk,
  };
  
  return fileType[fileExtension] || faFile;
};

export { determineFileType, formDate };
