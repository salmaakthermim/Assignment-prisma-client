'use client';
import { EditProjectAction } from '@/actions/EditProjectAction';
import UploadWidget from '@/components/features/imageupload/upload-widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TProject } from '@/zod/project.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ProjectEditForm({
  projectData,
}: {
  projectData: TProject;
}) {
  const router = useRouter();
  const [name, setName] = useState<string>(projectData.name);
  const [description, setDescription] = useState<string>(
    projectData.description ?? ''
  );
  const [imageUrl, setImageUrl] = useState<string>(
    projectData.thumbnailUrl ?? ''
  );
  const [liveUrl, setLiveUrl] = useState<string>(projectData.liveUrl ?? '');
  const [projectUrl, setProjectUrl] = useState<string>(
    projectData.projectUrl ?? ''
  );
  const [featureInput, setFeatureInput] = useState<string>('');
  const [features, setFeatures] = useState<string[]>(
    projectData.features ?? []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddFeature = () => {
    const v = featureInput.trim();
    if (!v) return;
    setFeatures((prev) => [...prev, v]);
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !description || !liveUrl || !projectUrl) {
      toast.error('Please fill in required fields');
      return;
    }
    if (!imageUrl || imageUrl == '') {
      toast.error('Please upload the thumbnail image');
      return;
    }

    setIsSubmitting(true);

    const payload: TProject = {
      id: projectData.id,
      name,
      description,
      thumbnailUrl: imageUrl || undefined,
      liveUrl,
      projectUrl,
      features,
    } as TProject;

    const res = await EditProjectAction(payload);
    if ((res as any).succes) {
      toast.success('Project updated successfully!');
      router.push('/dashboard');
    } else {
      toast.error('Project update failed');
    }
    setIsSubmitting(false);
  };

  return (
    <section className='mx-auto px-4 py-20 max-w-6xl'>
      <div className='mb-6'>
        <Link href={`/`}>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='mr-2 w-4 h-4' />
            Back
          </Button>
        </Link>
      </div>
      <h1 className='mb-8 font-bold text-3xl'>Edit Project</h1>
      <form className='space-y-6 max-w-3xl' onSubmit={handleSubmit}>
        <div className='space-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter project name'
            className='bg-slate-50'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='description'>Description</Label>
          <Input
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter project description'
            className='bg-slate-50'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label>Upload Project Thumbnail</Label>
          <UploadWidget onUploadComplete={setImageUrl} />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='liveUrl'>Live URL</Label>
          <Input
            id='liveUrl'
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder='https://your-project-live.com'
            className='bg-slate-50'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='projectUrl'>Project Repo / URL</Label>
          <Input
            id='projectUrl'
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            placeholder='https://github.com/your/repo'
            className='bg-slate-50'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label>Features</Label>
          <div className='flex gap-2'>
            <Input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder='Add a feature and click Add'
              className='bg-slate-50'
            />
            <Button type='button' onClick={handleAddFeature}>
              Add
            </Button>
          </div>
          <div className='space-y-1 mt-2'>
            {features.map((f, i) => (
              <div
                key={i}
                className='flex justify-between items-center bg-white shadow-sm p-2 rounded'
              >
                <div className='text-sm'>{f}</div>
                <button
                  type='button'
                  onClick={() => handleRemoveFeature(i)}
                  className='ml-2 text-red-500'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Project'}
        </Button>
      </form>
    </section>
  );
}
