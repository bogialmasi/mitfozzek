'use client'
import { HeroCancel, HeroCheck, HeroTrash } from "@/components/icons";
import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MyDeactivateModal } from "@/components/profile/modal_deactivate";
import { siteConfig } from "@/config/site";

export default function EditProfilePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // current
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
  
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/authcheck', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (!data.success) {
          setError('Bejelentkezés szükséges');
          setLoading(false);
          return;
        }
  
        // If logged in, fetch user profile
        fetchProfile();
      } catch (err) {
        setError('Bejelentkezés szükséges');
        setLoading(false);
      }
    };
  
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include',
        });
  
        const data = await response.json();
        if (data.success && data.user_id && data.username) {
          setUsername(data.username);
          setEmail(data.email);
          setDescription(data.user_desc || ' ');
        } else {
          setError(data.message || 'A profil módosítása sikertelen');
        }
      } catch (err) {
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };
  
    checkLogin();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== newPasswordAgain) {
      setError('A jelszavak nem egyeznek');
      return;
    }
    setLoading(true);

    const updatedData: any = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (description) updatedData.description = description;
    if (password) updatedData.password = password;
    if (password && newPassword && newPasswordAgain) {
      updatedData.newPassword = newPassword;
    }

    try {
      const response = await fetch('/api/profile/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent
        body: JSON.stringify(updatedData),
      });
      const res = await response.json();
      if (!response.ok) {
        if (res.message === 'Old password is incorrect') {
          setError('A megadott jelszó helytelen');
        } else {
          setError(res.message || 'Hiba történt a módosítás során.');
        }
        return;
      }
      router.push(siteConfig.links.profile);
    } catch (err) {
      console.error('Módosítás közben hiba lépett fel:', err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  function handleCancel() {
    router.push(siteConfig.links.profile);
  }

  function handleDeactivate() {
    setIsModalOpen(true);
  }

  if (loading) return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <p>Betöltés...</p>
        <Spinner />
      </div>
    </div>);

  return (
    <div>
      <h1 className={title()}>Profil módosítása</h1>
      <Form onSubmit={handleSubmit} validationBehavior="native"
        className="w-full flex flex-col gap-6 py-4">
        <Input
          value={username} onChange={(e) => setUsername(e.target.value)}
          label="Felhasználónév"
          labelPlacement="outside"
          name="username"
          placeholder="Felhasználónév"
          type="text"
          variant="bordered"
        />
        <Input
          value={password} onChange={(e) => setPassword(e.target.value)}
          isRequired
          errorMessage="Jelszó megadás kötelező!"
          label="Jelenlegi jelszó"
          labelPlacement="outside"
          name="password"
          placeholder="Jelenlegi jelszó"
          type="password"
          variant="bordered"
        />
        <Input
          value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
          label="Új jelszó"
          labelPlacement="outside"
          name="password"
          placeholder="Új jelszó"
          type="password"
          variant="bordered"
        />
        <Input
          value={newPasswordAgain} onChange={(e) => setNewPasswordAgain(e.target.value)}
          label="Új jelszó újra"
          labelPlacement="outside"
          name="password"
          placeholder="Új jelszó újra"
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="py-4 flex justify-center w-full space-x-4">
          <Button type="submit"><HeroCheck />Módosítások mentése</Button>
          <Button type="button" onClick={handleCancel}><HeroCancel />Mégsem</Button>
        </div>
        <div className="flex justify-center w-full">
          <Button type="button" onClick={handleDeactivate} color="danger" variant="ghost"><HeroTrash />Felhasználói fiók deaktiválása</Button>
        </div>
      </Form>
      <MyDeactivateModal isOpen={isModalOpen}
        onOpenChange={(openState) => {
          setIsModalOpen(openState);
          if (!openState && !localStorage.getItem('token')) {
            router.replace('/')
          }
        }} />
    </div>
  );
}
