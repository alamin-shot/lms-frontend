'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface EnrollmentButtonProps {
  isEnrolled: boolean;
  onEnroll?: () => void;
}

export function EnrollmentButton({
  isEnrolled,
  onEnroll,
}: EnrollmentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    // TODO: Call API to enroll
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    onEnroll?.();
  };

  if (isEnrolled) {
    return (
      <Button variant="outline" className="w-full md:w-auto" disabled>
        ✅ Enrolled
      </Button>
    );
  }

  return (
    <Button
      className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
      onClick={handleEnroll}
      disabled={loading}
    >
      {loading ? 'Enrolling...' : 'Enroll Now'}
    </Button>
  );
}