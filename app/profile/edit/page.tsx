'use client'
import { HeroCancel, HeroCheck, HeroTrash } from "@/components/icons";
import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Spinner } from "@heroui/react";
import { PressEvent } from "@react-types/shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MyDeactivateModal } from "@/components/profile/modal_deactivate";

export default function EditProfilePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Bejelentkezés szükséges');
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success && data.user_id && data.username) {
          setUsername(data.username);
          setEmail(data.email);
          setDescription(data.user_desc || ' ');
        } else {
          setError(data.message || 'Edit profile failed');
        }
      }
      catch (err) {
        setError('Something went wrong.');
        setLoading(false);
      }
      finally {
        setLoading(false);
      }
    }; fetchProfile();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    const updatedData: any = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (description) updatedData.description = description;
    if (password) updatedData.password = password;

    e.preventDefault();
    setError('');
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Bejelentkezés szükséges');
      setLoading(false);
      return;
    }

    /* Profile editing */
    try {
      const response = await fetch('/api/profile/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        setError(`Hiba: ${response.statusText} (${response.status})`);
        return;
      }

      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
        router.push('/profile');
      } else {
        setError(data.message || 'Update failed.');
      }
    } catch (err) {
      console.error('Error submitting profile update:', err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Does not save any of the changes
  function handleCancel(e: PressEvent): void {
    router.push('/profile');
  }

  function handleDeactivate(e: PressEvent): void {
    setIsModalOpen(true);
  }

  if (loading) return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <p>Betöltés...</p>
        <Spinner />
      </div>
    </div>);

  if (error) return <div>{error}</div>;



  return (
    <div>
      <h1 className={title()}>Profil módosítása</h1>
      <Form onSubmit={handleSubmit} validationBehavior="native"
        className="w-full flex flex-col gap-6 py-4">
        <Input
          value={username} onChange={(e) => setUsername(e.target.value)}
          errorMessage="!"
          label="Felhasználónév"
          labelPlacement="outside"
          name="username"
          placeholder="Felhasználónév"
          type="text"
          variant="bordered"
        />
        <Input
          value={password} onChange={(e) => setPassword(e.target.value)}
          errorMessage="!"
          label="Jelszó"
          labelPlacement="outside"
          name="password"
          placeholder="Jelszó"
          type="password"
          variant="bordered"
        />
        <Input
          value={email} onChange={(e) => setEmail(e.target.value)}
          errorMessage="Adjon meg érvényes emailt"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Email"
          type="email"
          variant="bordered"
        />
        <Textarea
          value={description} onChange={(e) => setDescription(e.target.value)}
          labelPlacement="outside"
          name="description"
          placeholder="Magamról"
          type="text"
          variant="bordered"
          maxLength={250}
          errorMessage="Maximum 250 karakter megengedett"
          isClearable
          onClear={() => setDescription('')}
          isInvalid={description.length >= 250}
        />
        <div className="py-4 flex justify-center w-full space-x-4">
          <Button type="submit"><HeroCheck />Módosítások mentése</Button><Button type="button" onPress={handleCancel}><HeroCancel />Mégsem</Button>
        </div>
        <div className="flex justify-center w-full">
          <Button type="button" onPress={handleDeactivate} color="danger" variant="ghost"><HeroTrash />Felhasználói fiók deaktiválása</Button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>
      <MyDeactivateModal isOpen={isModalOpen} 
      onOpenChange={(isModalOpen) =>{
        if(!isModalOpen && !localStorage.getItem("token")) {router.replace("/")} // Replace doesn't allow going back
      }} />
    </div>
  );
}
