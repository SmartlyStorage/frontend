export interface MediaFile {
  id: string;
  path: string;
  name: string;
  size: number;
  type: 'photo' | 'video';
  createdDate: Date;
  lastModifiedDate: Date;
  lastAccessedDate?: Date;
  thumbnail?: string;
}

export interface ScanResult {
  totalFiles: number;
  totalSize: number;
  oldFiles: number;
  oldFilesSize: number;
  folders: FolderInfo[];
}

export interface FolderInfo {
  name: string;
  count: number;
  size: number;
}

export interface ArchiveItem {
  id: string;
  name: string;
  fileCount: number;
  size: number;
  createdDate: Date;
  uploadStatus: 'pending' | 'uploading' | 'completed' | 'failed';
  cloudPath: string;
  checksum?: string;
}

export interface CloudService {
  id: string;
  name: string;
  type: 'google_drive' | 'google_photos' | 'dropbox';
  connected: boolean;
  storageUsed: number;
  storageLimit: number;
}

export interface ArchiveJob {
  id: string;
  files: MediaFile[];
  status: 'queued' | 'compressing' | 'uploading' | 'completed' | 'failed';
  progress: number;
  archiveName: string;
  estimatedSize: number;
  createdDate: Date;
}