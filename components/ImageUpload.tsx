"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import {
  IKImage,
  IKUpload,
  ImageKitContext,
  ImageKitProvider,
} from "imagekitio-next";
import { toast } from "sonner";

import config from "@/lib/config";

import { Button } from "./ui/button";

const { publicKey, urlEndpoint } = config.env.imagekit;
const authenticator = async () => {
  try {
    console.log(`${config.env.prodApiEndpoint}/api/auth/imagekit`);
    const apiEndpoint =
      process.env.NODE_ENV == "production"
        ? config.env.prodApiEndpoint
        : config.env.apiEndpoint;
    const response = await fetch(
      `${config.env.prodApiEndpoint}/api/auth/imagekit`,
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request Failed with status: ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication Request Failed: ${error.message}`);
  }
};

interface ImageUploadProps {
  onFileChange: (filePath: string) => void;
}

const ImageUpload = ({ onFileChange }: ImageUploadProps) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onSuccess = (res: any) => {
    setFile({ filePath: res.filePath });
    onFileChange(res.filePath);

    toast.message("Image uploaded successfully", {
      description: `${res.filePath} uploaded successfully!`,
    });
  };
  const onError = (error: any) => {
    console.log(error);
    toast.error("Image uploaded failed!");
  };

  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onSuccess={onSuccess}
        onError={onError}
        fileName="test-upload.png"
      />
      <button
        className="upload-btn"
        onClick={(env) => {
          env.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
      </button>
      {file && (
        <>
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
          <p className="upload-filename">{file.filePath}</p>
        </>
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
