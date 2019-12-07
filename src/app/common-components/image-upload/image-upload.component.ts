import { Component, OnInit, Output } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { EnvironmentUrlService } from 'src/app/shared/services/environment-url.service';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-image-upload',
    templateUrl: 'image-upload.component.html'
})
export class ImageUploadComponent implements OnInit {
    private uploader: FileUploader;
    @Output() uploaded = new EventEmitter<string>();
    private selectedFile: FileItem;

    constructor(private env: EnvironmentUrlService) { }

    ngOnInit() {
        this.uploader = this.createUploader();
        this.uploader.onAfterAddingFile = (fileItem) => this.selectedFile = fileItem;;
        this.uploader.onBuildItemForm = (fileItem, form) => this.onBuildForm(fileItem, form);
        this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    }

    private createUploader() {
        const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/${this.env.cloudinaryCloud}/upload`,
            autoUpload: false,
            isHTML5: true,
            removeAfterUpload: true,
            headers: [
                {
                    name: 'X-Requested-With',
                    value: 'XMLHttpRequest'
                }
            ]
        };
        return new FileUploader(uploaderOptions);
    }

    private onBuildForm(fileItem: any, form: FormData) {
        form.append('upload_preset', this.env.cloudinaryPreset);
        form.append('file', fileItem);
        fileItem.withCredentials = false;
        return { fileItem, form };
    }

    private onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
        let jsonResponse = JSON.parse(response);
        this.uploaded.emit(jsonResponse.public_id);
    }

    submit() {
        if (this.selectedFile == null) {
            this.uploaded.emit(null);
            return;
        }
        this.uploader.uploadAll();
    }
}