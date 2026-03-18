"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import '@/styles/rich-text-editor.css';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Link,
  Unlink,
  Image,
  Video,
  Music,
  FileText,
  Undo,
  Redo,
  Highlighter,
  Superscript,
  Subscript,
  Minus,
  Maximize2,
  Code,
  Smile,
  Omega,
  Type,
  Eye,
  File,
  Edit,
  View,
  Plus,
  Type as FormatIcon,
  Settings as Tools,
  Table,
  Upload,
  X
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  allowedDomains?: string[];
  onCspViolation?: (violation: { type: string; url: string }) => void;
}

const fontFamilies = [
  // --- Nhóm Web-safe Fonts (Cơ bản, hiển thị tốt trên mọi thiết bị) ---
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Palatino Linotype', label: 'Palatino' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },

  // --- Nhóm Modern Web Fonts (Phổ biến hiện nay, thường dùng qua Google Fonts) ---
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Nunito', label: 'Nunito' }
];

const fontSizes = [
  { value: '8pt', label: '8pt' },
  { value: '10pt', label: '10pt' },
  { value: '12pt', label: '12pt' },
  { value: '14pt', label: '14pt' },
  { value: '16pt', label: '16pt' },
  { value: '18pt', label: '18pt' },
  { value: '20pt', label: '20pt' },
  { value: '24pt', label: '24pt' },
  { value: '28pt', label: '28pt' },
  { value: '32pt', label: '32pt' },
  { value: '36pt', label: '36pt' },
];

const headingStyles = [
  { value: 'p', label: 'Đoạn văn' },
  { value: 'h1', label: 'Tiêu đề 1' },
  { value: 'h2', label: 'Tiêu đề 2' },
  { value: 'h3', label: 'Tiêu đề 3' },
  { value: 'h4', label: 'Tiêu đề 4' },
  { value: 'h5', label: 'Tiêu đề 5' },
  { value: 'h6', label: 'Tiêu đề 6' },
];

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Viết nội dung tại đây...", 
  height = "400px",
  allowedDomains = [
    'exsoflgvdreikabvhvkg.supabase.co',
    '*.supabase.co',
    'localhost',
    '127.0.0.1',
    'images.unsplash.com',
    'i.imgur.com',
    'i.ibb.co',
    'placehold.co',
    'va.vercel-scripts.com'
  ],
  onCspViolation
}: RichTextEditorProps) {
  const [mode, setMode] = useState<'visual' | 'text'>('visual');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (mode === 'visual' && editorRef.current) {
      editorRef.current.innerHTML = value;
    } else if (mode === 'text' && textareaRef.current) {
      textareaRef.current.value = value;
    }
  }, [value, mode]);

  const updateContent = (content: string) => {
    onChange(content);
  };

  // CSP Validation Functions
  const isDomainAllowed = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      
      // Data URLs are always allowed
      if (url.startsWith('data:')) {
        return true;
      }
      
      // Check for exact matches
      if (allowedDomains.includes(hostname)) {
        return true;
      }
      
      // Check for wildcard patterns
      for (const domain of allowedDomains) {
        if (domain.startsWith('*.')) {
          const baseDomain = domain.slice(2);
          if (hostname === baseDomain || hostname.endsWith('.' + baseDomain)) {
            return true;
          }
        }
      }
      
      return false;
    } catch {
      // Invalid URL, but data URLs should still work
      return url.startsWith('data:');
    }
  };

  const validateUrl = (url: string, type: 'image' | 'link'): { isValid: boolean; warning?: string } => {
    if (!url) return { isValid: false, warning: 'URL không được để trống' };
    
    // Data URLs are always valid for images
    if (url.startsWith('data:')) {
      if (type === 'image') {
        return { isValid: true };
      }
      return { isValid: false, warning: 'Data URLs không được hỗ trợ cho liên kết' };
    }
    
    try {
      const urlObj = new URL(url);
      
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return { isValid: false, warning: 'Chỉ chấp nhận HTTP và HTTPS URLs' };
      }
      
      if (type === 'image' && !isDomainAllowed(url)) {
        const warning = `Domain "${urlObj.hostname}" không có trong danh sách cho phép. Hình ảnh có thể không hiển thị do CSP.`;
        onCspViolation?.({ type: 'image', url });
        return { isValid: true, warning };
      }
      
      return { isValid: true };
    } catch {
      return { isValid: false, warning: 'URL không hợp lệ' };
    }
  };

  const createSafeImageHtml = (url: string, alt: string): string => {
    const validation = validateUrl(url, 'image');
    if (!validation.isValid) {
      return `<div class="csp-error" style="padding: 8px; background: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c33;">⚠️ ${validation.warning || 'URL không hợp lệ'}</div>`;
    }
    
    const warningAttr = validation.warning ? `data-csp-warning="${validation.warning.replace(/"/g, '&quot;')}"` : '';
    return `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto;" ${warningAttr} onerror="this.outerHTML='<div style=\\'padding: 8px; background: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c33;\\'>⚠️ Không thể tải ảnh (CSP blocked)</div>'" />`;
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      updateContent(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const validation = validateUrl(linkUrl, 'link');
      if (!validation.isValid) {
        alert(`Lỗi liên kết: ${validation.warning}`);
        return;
      }
      
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      document.execCommand('insertHTML', false, linkHtml);
      if (editorRef.current) {
        updateContent(editorRef.current.innerHTML);
      }
      setShowLinkDialog(false);
      setLinkUrl('');
      setLinkText('');
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const imageHtml = createSafeImageHtml(imageUrl, imageAlt);
      document.execCommand('insertHTML', false, imageHtml);
      if (editorRef.current) {
        updateContent(editorRef.current.innerHTML);
      }
      setShowImageDialog(false);
      setImageUrl('');
      setImageAlt('');
    }
  };

  const handleFileUpload = (type: 'image' | 'video' | 'audio') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : 'audio/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real app, you would upload this to your server
        // For now, we'll create a local URL
        const url = URL.createObjectURL(file);
        if (type === 'image') {
          const imageHtml = `<img src="${url}" alt="${file.name}" style="max-width: 100%; height: auto;" />`;
          document.execCommand('insertHTML', false, imageHtml);
        } else if (type === 'video') {
          const videoHtml = `<video controls style="max-width: 100%;"><source src="${url}" type="${file.type}"></video>`;
          document.execCommand('insertHTML', false, videoHtml);
        } else {
          const audioHtml = `<audio controls><source src="${url}" type="${file.type}"></audio>`;
          document.execCommand('insertHTML', false, audioHtml);
        }
        if (editorRef.current) {
          updateContent(editorRef.current.innerHTML);
        }
      }
    };
    input.click();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const clearFormatting = () => {
    document.execCommand('removeFormat', false);
    if (editorRef.current) {
      updateContent(editorRef.current.innerHTML);
    }
  };

  const viewSource = () => {
    if (editorRef.current) {
      const source = editorRef.current.innerHTML;
      alert('Mã nguồn HTML:\n\n' + source);
    }
  };

  return (
    <div className={`border border-border rounded-lg overflow-hidden ${isFullscreen ? 'rich-editor-fullscreen' : ''}`}>
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 p-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={mode === 'visual' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode('visual')}
            className="flex items-center gap-1"
          >
            <Eye className="h-4 w-4" />
            Trực quan
          </Button>
          <Button
            type="button"
            variant={mode === 'text' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode('text')}
            className="flex items-center gap-1"
          >
            <Code className="h-4 w-4" />
            Văn bản
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleFileUpload.bind(null, 'image')}
            className="flex items-center gap-1"
          >
            <Upload className="h-4 w-4" />
            Thêm phương tiện
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="flex items-center gap-1"
          >
            {isFullscreen ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            {isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          </Button>
        </div>
      </div>

      {/* Top Menu Bar */}
      <div className="flex items-center border-b border-border bg-secondary/20 px-2 py-1">
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1">
            <File className="h-4 w-4" />
            Tệp tin
          </Button>
          <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </Button>
          <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1">
            <View className="h-4 w-4" />
            Xem
          </Button>
          <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Chèn
          </Button>
          <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1">
            <FormatIcon className="h-4 w-4" />
            Định dạng
          </Button>
          <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1">
            <Tools className="h-4 w-4" />
            Công cụ
          </Button>
          <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1">
            <Table className="h-4 w-4" />
            Bảng
          </Button>
        </div>
      </div>

      {/* Formatting Toolbar - Row 1 */}
      <div className="flex items-center gap-1 border-b border-border bg-secondary/30 p-2 flex-wrap">
        {/* Font and Style Group */}
        <Select defaultValue="p">
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {headingStyles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="Arial">
          <SelectTrigger className="w-24 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="12pt">
          <SelectTrigger className="w-16 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Basic Formatting Group */}
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('bold')}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('italic')}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('underline')}>
          <Underline className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('strikeThrough')}>
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('formatBlock', 'blockquote')}>
          <Quote className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('removeFormat')}>
          <X className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('superscript')}>
          <Superscript className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('subscript')}>
          <Subscript className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Color Group */}
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('foreColor')}>
          <Type className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('hiliteColor')}>
          <Highlighter className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Alignment and Layout Group */}
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('insertUnorderedList')}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('insertOrderedList')}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('justifyLeft')}>
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('justifyCenter')}>
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('justifyRight')}>
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('insertHorizontalRule')}>
          <Minus className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Link and Insert Group */}
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowLinkDialog(true)}>
          <Link className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('unlink')}>
          <Unlink className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowImageDialog(true)}>
          <Image className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={handleFileUpload.bind(null, 'video')}>
          <Video className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={handleFileUpload.bind(null, 'audio')}>
          <Music className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={handleFileUpload.bind(null, 'image')}>
          <FileText className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
          <Omega className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
          <Smile className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* System/Action Group */}
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('undo')}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand('redo')}>
          <Redo className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={clearFormatting}>
          <X className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={viewSource}>
          <Code className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <div 
        ref={editorRef}
        contentEditable={mode === 'visual'}
        className="rich-editor-content"
        onInput={(e) => updateContent((e.target as HTMLDivElement).innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
      />
      
      {mode === 'text' && (
        <textarea
          ref={textareaRef}
          className="rich-editor-textarea"
          value={value}
          onChange={(e) => updateContent(e.target.value)}
          placeholder={placeholder}
        />
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Chèn liên kết</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Văn bản hiển thị</label>
                <Input
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Nhãn liên kết"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowLinkDialog(false)}>
                  Hủy
                </Button>
                <Button type="button" onClick={insertLink}>
                  Chèn
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Chèn hình ảnh</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">URL hình ảnh</label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                {imageUrl && (
                  <div className="mt-2">
                    {(() => {
                      const validation = validateUrl(imageUrl, 'image');
                      if (validation.warning) {
                        return (
                          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                            ⚠️ {validation.warning}
                          </div>
                        );
                      }
                      return (
                        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
                          ✅ URL hợp lệ và được phép
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Alt text</label>
                <Input
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Mô tả hình ảnh"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                <p className="font-semibold mb-1">Các domain được phép:</p>
                <div className="flex flex-wrap gap-1">
                  {allowedDomains.slice(0, 3).map(domain => (
                    <span key={domain} className="bg-secondary px-2 py-1 rounded text-xs">
                      {domain}
                    </span>
                  ))}
                  {allowedDomains.length > 3 && (
                    <span className="bg-secondary px-2 py-1 rounded text-xs">
                      +{allowedDomains.length - 3} khác
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowImageDialog(false)}>
                  Hủy
                </Button>
                <Button type="button" onClick={insertImage}>
                  Chèn
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
