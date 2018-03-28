package com.wmdd4940.ricardo.slidingpuzzle;

//package com.example.storage;
/**
 * Created by Focused Daniel on 2018-03-27.
 */
// Imports the Google Cloud client library
import android.annotation.TargetApi;
import android.os.Build;

import com.google.cloud.ReadChannel;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.BucketInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
import java.nio.channels.WritableByteChannel;
import java.nio.file.Path;

public class CloudStorage {
    public static void main(String... args) throws Exception {
        // Instantiates a client
        Storage storage = StorageOptions.getDefaultInstance().getService();

        // The name for the new bucket
        String bucketName = args[0];  // "my-new-bucket";

        // Creates the new bucket
//        Bucket bucket = storage.create(BucketInfo.of(bucketName));

//        System.out.printf("Bucket %s created.%n", bucket.getName());
    }

    @TargetApi(Build.VERSION_CODES.O)
    private void download(Storage storage, String bucketName, String objectName, Path downloadTo) throws IOException {
        BlobId blobId = BlobId.of(bucketName, objectName);
        Blob blob = storage.get(blobId);
        if (blob == null) {
            System.out.println("No such object");
            return;
        }
        PrintStream writeTo = System.out;
        if (downloadTo != null) {
            writeTo = new PrintStream(new FileOutputStream(downloadTo.toFile()));
        }
        if (blob.getSize() < 1_000_000) {
            // Blob is small read all its content in one request
            byte[] content = blob.getContent();
            writeTo.write(content);
        } else {
            // When Blob size is big or unknown use the blob's channel reader.
            try (ReadChannel reader = blob.reader()) {
                WritableByteChannel channel = Channels.newChannel(writeTo);
                ByteBuffer bytes = ByteBuffer.allocate(64 * 1024);
                while (reader.read(bytes) > 0) {
                    bytes.flip();
                    channel.write(bytes);
                    bytes.clear();
                }
            }
        }
        if (downloadTo == null) {
            writeTo.println();
        } else {
            writeTo.close();
        }
    }
}