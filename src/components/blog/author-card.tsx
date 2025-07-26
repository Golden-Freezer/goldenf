import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Mail, Globe } from 'lucide-react';

interface AuthorCardProps {
  name: string;
  bio: string;
  avatar: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
}

export function AuthorCard({ name, bio, avatar, social }: AuthorCardProps) {
  return (
    <div className="author-card">
      <div className="author-avatar">
        <Image
          src={avatar}
          alt={`${name} 프로필 사진`}
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
      </div>
      
      <div className="author-info flex-1">
        <h3>{name}</h3>
        <p>{bio}</p>
        
        {social && (
          <div className="author-social">
            {social.twitter && (
              <Link
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="트위터"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            )}
            {social.linkedin && (
              <Link
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="링크드인"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            )}
            {social.email && (
              <Link
                href={`mailto:${social.email}`}
                aria-label="이메일"
              >
                <Mail className="w-5 h-5" />
              </Link>
            )}
            {social.website && (
              <Link
                href={social.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="웹사이트"
              >
                <Globe className="w-5 h-5" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}