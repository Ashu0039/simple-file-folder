import { ROOT, FILE, FOLDER } from './constants';

const initialData = {
  root : {
    id: ROOT,
    title: 'Home',
    type: FOLDER,
    parent: null,
    content: [ 'folder1' ],
  },
  folder1: {
    id: 'folder1',
    title: 'Folder 1',
    type: FOLDER,
    parent: ROOT,
    content: [ 'file1', 'folder2' ],
  },
  file1: {
    id: 'file1',
    title: 'File 1',
    type: FILE,
  },
  folder2: {
    id: 'folder2',
    title: 'Folder 2',
    type: FOLDER,
    parent: 'folder1',
    content: [],
  },
};

export default initialData;
