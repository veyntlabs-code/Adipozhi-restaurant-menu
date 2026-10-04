"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { QrCode, Download, Printer, Copy, ExternalLink, Loader2 } from "lucide-react";
import QRCode from "qrcode";
import toast from "react-hot-toast";

export default function QRPage() {
  const [restaurant, setRestaurant] = useState<{ name: string; slug: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const publicUrl = restaurant ? `${appUrl}/menu/${restaurant.slug}` : "";

  const generateQR = useCallback(async (url: string) => {
    if (!url) return;
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: { dark: "#1a1a24", light: "#FFFFFF" },
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(dataUrl);
    } catch {
      toast.error("Failed to generate QR code");
    }
  }, []);

  useEffect(() => {
    fetch("/api/admin/restaurant")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setRestaurant(data.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (publicUrl) generateQR(publicUrl);
  }, [publicUrl, generateQR]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      toast.success("URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `${restaurant?.slug || "menu"}-qr-code.png`;
    a.click();
    toast.success("QR code downloaded!");
  };

  const handlePrint = () => {
    if (!qrDataUrl || !restaurant) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${restaurant.name}</title>
          <style>
            body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; padding: 40px; }
            img { width: 280px; height: 280px; border: 2px solid #eee; border-radius: 12px; }
            h1 { font-size: 24px; margin-bottom: 4px; }
            p { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <h1>${restaurant.name}</h1>
          <p>Scan to view our menu</p>
          <img src="${qrDataUrl}" alt="QR Code" />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">${publicUrl}</p>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-[#f17011]" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#e8e8f0]">QR Code</h1>
        <p className="text-[#8888a0] text-sm mt-1">Share your public menu with customers</p>
      </div>

      <div className="max-w-md">
        {/* QR Card */}
        <div className="bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode size={20} className="text-[#f17011]" />
            <h2 className="font-semibold text-[#e8e8f0]">{restaurant?.name}</h2>
          </div>

          {/* QR Code Image */}
          <div className="w-56 h-56 mx-auto rounded-2xl bg-white p-3 shadow-lg mb-4">
            {qrDataUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={qrDataUrl} alt="Menu QR Code" className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-[#f17011]" />
              </div>
            )}
          </div>

          <p className="text-xs text-[#8888a0] mb-4">Scan to view the digital menu</p>

          {/* URL display */}
          <div className="bg-[#0f0f14] border border-[#2e2e3d] rounded-xl px-3 py-2 mb-4 text-left">
            <p className="text-xs text-[#8888a0] font-medium mb-1">Public URL</p>
            <p className="text-xs text-[#f17011] break-all font-mono">{publicUrl}</p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id="copy-url-btn"
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#22222f] border border-[#2e2e3d] text-[#8888a0] hover:text-[#e8e8f0] hover:border-[#f17011]/30 text-sm font-medium transition-all"
            >
              <Copy size={15} /> Copy URL
            </button>
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#22222f] border border-[#2e2e3d] text-[#8888a0] hover:text-[#e8e8f0] hover:border-[#f17011]/30 text-sm font-medium transition-all"
            >
              <ExternalLink size={15} /> Preview
            </a>
            <button
              id="download-qr-btn"
              onClick={handleDownload}
              disabled={!qrDataUrl}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f17011] to-[#e25607] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Download size={15} /> Download QR
            </button>
            <button
              id="print-qr-btn"
              onClick={handlePrint}
              disabled={!qrDataUrl}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#22222f] border border-[#2e2e3d] text-[#8888a0] hover:text-[#e8e8f0] hover:border-[#f17011]/30 text-sm font-medium transition-all disabled:opacity-50"
            >
              <Printer size={15} /> Print QR
            </button>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Tip */}
        <div className="mt-4 p-4 bg-[#f17011]/10 border border-[#f17011]/20 rounded-xl">
          <p className="text-xs text-[#f17011] font-medium">💡 Tip</p>
          <p className="text-xs text-[#8888a0] mt-1">
            Place this QR code on your restaurant tables, menus, or entrance. Customers scan it to instantly view your digital menu.
          </p>
          <p className="text-xs text-[#8888a0] mt-1">
            If you update your restaurant&apos;s slug in Settings, the QR code will automatically update to point to the new URL.
          </p>
        </div>
      </div>
    </div>
  );
}
