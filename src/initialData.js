import { ROOT, FILE, FOLDER } from './constants';

const initialData = {
  root : {
    id: ROOT,
    title: 'Home',
    type: FOLDER,
    parent: null,
    children: [ 'folder1' ],
  },
  folder1: {
    id: 'folder1',
    title: 'Folder 1',
    type: FOLDER,
    parent: ROOT,
    children: [ 'file1', 'folder2' ],
  },
  file1: {
    id: 'file1',
    title: 'File 1',
    parent: 'folder1',
    type: FILE,
  },
  folder2: {
    id: 'folder2',
    title: 'Folder 2',
    type: FOLDER,
    parent: 'folder1',
    children: ['folder3'],
  },
  folder3: {
    id: 'folder3',
    title: 'Folder 3',
    type: FOLDER,
    parent: 'folder2',
    children: [],
  }
};

export default initialData;
