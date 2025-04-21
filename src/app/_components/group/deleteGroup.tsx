
'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteGroup({ id }: { id: string }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/group/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Ошибка при удалении группы");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setTimeout(() => router.push("/group"), 2000);
    },
    onError: (err: any) => {
      setError(err.message || "Произошла ошибка");
    },
  });

  return (
    <div className="flex max-w-xs flex-col space-y-2">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <button
        onClick={() => mutation.mutate()}
        type="button"
        className="btn btn-primary"
      >
          Удалить
      </button>
    </div>
  );
}
