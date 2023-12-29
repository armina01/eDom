
export interface GetFileResponseFile {
    fileId: number; // Assuming this is a base64-encoded string, adjust if needed
    imeFile: string;  // Assuming this is a string, adjust if needed
}

export interface GetFileResponse {
    files: GetFileResponseFile[];
}
