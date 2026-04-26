"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import { capNhatBaiViet, UpdateBaiViet } from "@/lib/baiviet";
import { BaiViet } from "@/lib/baiviet-server";
import Image from "next/image";

interface ExtendedBaiViet extends BaiViet {
  category: string | null;
  tags: string | null;
}

interface BlogEditFormProps {
  post: ExtendedBaiViet;
}

export function BlogEditForm({ post }: BlogEditFormProps) {
  const router = useRouter();
  const postId = post.id;

  const [formData, setFormData] = useState<UpdateBaiViet>({
    tieude: post.tieude || "",
    noidung: post.noidung || "",
    tomtat: post.tomtat || "",
    anh_dai_dien: post.anh_dai_dien || "",
    trang_thai: post.trang_thai || "draft",
  });

  const [category, setCategory] = useState(post.category || "");
  const [tags, setTags] = useState(post.tags || "");
  const [isSaving, setIsSaving] = useState(false);
  const [featuredImageWarning, setFeaturedImageWarning] = useState<
    string | null
  >(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (!formData.tieude?.trim()) {
        throw new Error("Tiêu đề không được để trống");
      }
      if (!formData.noidung?.trim()) {
        throw new Error("Nội dung không được để trống");
      }

      const updateData: UpdateBaiViet = {
        ...formData,
        trang_thai: formData.trang_thai as "draft" | "published" | "archived",
        category: category,
        tags: tags,
      };

      await capNhatBaiViet(postId, updateData);
      router.push("/admin/blog");
    } catch (error) {
      console.error("Failed to update blog post:", error);
      alert(
        `Lỗi khi cập nhật bài viết: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof UpdateBaiViet, value: string) => {
    setFormData((prev: UpdateBaiViet) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFeaturedImage = (
    url: string,
  ): { isValid: boolean; warning?: string } => {
    if (!url) return { isValid: true };
    if (url.startsWith("data:")) return { isValid: true };

    try {
      const urlObj = new URL(url);
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        return { isValid: false, warning: "Chỉ chấp nhận HTTP và HTTPS URLs" };
      }
      return { isValid: true };
    } catch {
      return { isValid: false, warning: "URL không hợp lệ" };
    }
  };

  const handleFeaturedImageChange = (value: string) => {
    handleInputChange("anh_dai_dien", value);
    const validation = validateFeaturedImage(value);
    setFeaturedImageWarning(validation.warning || null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Chỉnh sửa bài viết
          </h1>
          <p className="text-muted-foreground mt-1">
            Cập nhật nội dung bài viết
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nội dung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    placeholder="Nhập tiêu đề bài viết..."
                    value={formData.tieude || ""}
                    onChange={(e) =>
                      handleInputChange("tieude", e.target.value)
                    }
                    className="text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Tóm tắt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Mô tả ngắn về bài viết..."
                    value={formData.tomtat || ""}
                    onChange={(e) =>
                      handleInputChange("tomtat", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung</Label>
                  <div className="editor-container border rounded-lg overflow-hidden relative w-full h-[400px]">
                    <style jsx global>{`
                      .editor-container .simple-editor-wrapper {
                        width: 100% !important;
                        height: 100% !important;
                        max-width: 100% !important;
                        max-height: 400px !important;
                        overflow: auto !important;
                        position: relative !important;
                      }
                      .editor-container .simple-editor-content {
                        max-width: 100% !important;
                        width: 100% !important;
                        height: 100% !important;
                        margin: 0 !important;
                      }
                      .editor-container
                        .simple-editor-content
                        .tiptap.ProseMirror.simple-editor {
                        padding: 1rem !important;
                        max-width: 100% !important;
                        width: 100% !important;
                        min-height: 300px !important;
                      }
                      .editor-container .ProseMirror {
                        font-size: 14px !important;
                        line-height: 1.6 !important;
                        max-width: 100% !important;
                        width: 100% !important;
                      }
                      .editor-container
                        .simple-editor-wrapper
                        > div:first-child {
                        max-width: 100% !important;
                      }
                    `}</style>
                    <SimpleEditor
                      content={formData.noidung || ""}
                      onChange={(value) => handleInputChange("noidung", value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO & Meta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    placeholder="Tiêu đề SEO (tối đa 60 ký tự)"
                    value={formData.tieude?.substring(0, 60) || ""}
                    maxLength={60}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    placeholder="Mô tả SEO (tối đa 160 ký tự)"
                    value={formData.tomtat?.substring(0, 160) || ""}
                    maxLength={160}
                    rows={2}
                    readOnly
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Move sidebar cards to bottom */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Xuất bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleInputChange("trang_thai", "draft")}
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Lưu Nháp
                </Button>
                <Button type="submit" className="flex-1" disabled={isSaving}>
                  <Eye className="h-4 w-4 mr-2" />
                  Cập nhật
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chi tiết</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <Input
                  id="category"
                  placeholder="Nhập danh mục..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Thẻ</Label>
                <Input
                  id="tags"
                  placeholder="vd., nhạc, streaming, nghệ sĩ..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Phân cách các thẻ bằng dấu phẩy
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ảnh Nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="featuredImage">URL ảnh đại diện</Label>
                  <Input
                    id="featuredImage"
                    placeholder="https://example.com/image.jpg"
                    value={formData.anh_dai_dien || ""}
                    onChange={(e) => handleFeaturedImageChange(e.target.value)}
                  />
                </div>
                {featuredImageWarning && (
                  <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
                    {featuredImageWarning}
                  </div>
                )}
                {formData.anh_dai_dien && (
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={formData.anh_dai_dien}
                      alt="Featured image preview"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
