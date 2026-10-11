import {
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  FileText,
  GraduationCap,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const ProfileView = ({ user }) => {
  const education = user?.education || [];
  const experience = user?.experience || [];
  const skills = user?.skills || [];

  const profileFields = [
    Boolean(user?.name),
    Boolean(user?.email),
    Boolean(user?.phone),
    Boolean(user?.location),
    Boolean(user?.headline),
    Boolean(user?.bio),
    skills.length > 0,
    education.length > 0,
    experience.length > 0,
    Boolean(user?.linkedin),
    Boolean(user?.github),
    Boolean(user?.portfolio),
    Boolean(user?.resume?.url),
  ];

  const completedFields = profileFields.filter(Boolean).length;

  const completion =
    profileFields.length > 0
      ? Math.round((completedFields / profileFields.length) * 100)
      : 0;

  return (
    <div className="space-y-5">
      {/* Profile Completion */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold text-slate-900">
                Profile Completion
              </h2>

              <span className="text-sm font-bold text-slate-700">
                {completion}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 px-4 py-2.5 text-xs font-medium text-blue-700 sm:max-w-xs">
            Complete your profile to help recruiters understand your experience
            and skills.
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          {/* Personal Information */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-600" />

              <h2 className="text-base font-bold text-slate-900">
                Personal Information
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <ProfileField label="Full Name" value={user?.name} />

              <ProfileField
                label="Email"
                value={user?.email}
                icon={<Mail size={14} />}
              />

              <ProfileField
                label="Phone"
                value={user?.phone}
                icon={<Phone size={14} />}
              />

              <ProfileField
                label="Location"
                value={user?.location}
                icon={<MapPin size={14} />}
              />
            </div>
          </section>
          {/* Education */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-blue-600" size={22} />

              <h2 className="text-lg font-bold text-slate-900">Education</h2>
            </div>

            <div className="mt-5 space-y-4">
              {user?.education?.length > 0 ? (
                user.education.map((education, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-5"
                  >
                    {/* Top Row */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        {/* Degree */}
                        <h3 className="text-base font-semibold text-slate-900">
                          {education.degree || "Degree not specified"}
                        </h3>

                        {/* Institution */}
                        {education.institution && (
                          <p className="mt-1 text-sm font-medium text-blue-600">
                            {education.institution}
                          </p>
                        )}
                      </div>

                      {/* Years */}
                      {(education.startYear || education.endYear) && (
                        <span className="text-sm text-slate-500">
                          {education.startYear || ""}
                          {education.startYear && education.endYear && " - "}
                          {education.endYear || ""}
                        </span>
                      )}
                    </div>

                    {/* Subjects */}
                    {education.subjects?.length > 0 && (
                      <div className="mt-4 border-t border-slate-200 pt-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="mr-1 text-sm font-medium text-slate-600">
                            Subjects:
                          </span>

                          {education.subjects.map((subject, subjectIndex) => (
                            <span
                              key={subjectIndex}
                              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No education added yet.
                </p>
              )}
            </div>
          </section>
          0{/* Resume */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />

              <h2 className="text-base font-bold text-slate-900">Resume</h2>
            </div>

            {user?.resume?.url ? (
              <div className="mt-4 flex flex-col gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Resume
                    </p>

                    <p className="text-xs text-slate-400">Uploaded resume</p>
                  </div>
                </div>

                <a
                  href={user.resume.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  View Resume
                  <ExternalLink size={13} />
                </a>
              </div>
            ) : (
              <EmptyText text="No resume uploaded yet." />
            )}
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          {/* About */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">About</h2>

            <div className="mt-4">
              {user?.bio ? (
                <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                  {user.bio}
                </p>
              ) : (
                <EmptyText text="No bio added yet." />
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Skills</h2>

            {skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <EmptyText text="No skills added yet." />
              </div>
            )}
          </section>

          {/* Experience */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <BriefcaseBusiness size={18} className="text-blue-600" />

              <h2 className="text-base font-bold text-slate-900">Experience</h2>
            </div>

            {experience.length > 0 ? (
              <div className="mt-4 space-y-3">
                {experience.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {item.jobTitle || "Job title"}
                      </h3>

                      <p className="text-sm font-medium text-blue-600">
                        {item.company || "Company"}
                      </p>

                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <CalendarDays size={13} />
                        {item.startDate || "—"} -{" "}
                        {item.currentlyWorking
                          ? "Present"
                          : item.endDate || "—"}
                      </p>
                    </div>

                    {item.description && (
                      <p className="mt-3 text-sm leading-5 text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <EmptyText text="No experience added yet." />
              </div>
            )}
          </section>

          {/* Professional Links */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <LinkIcon size={18} className="text-blue-600" />

              <h2 className="text-base font-bold text-slate-900">
                Professional Links
              </h2>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {user?.linkedin && (
                <ProfileLink label="LinkedIn" href={user.linkedin} />
              )}

              {user?.github && (
                <ProfileLink label="GitHub" href={user.github} />
              )}

              {user?.portfolio && (
                <ProfileLink label="Portfolio" href={user.portfolio} />
              )}

              {!user?.linkedin && !user?.github && !user?.portfolio && (
                <EmptyText text="No professional links added." />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, icon }) => {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
        {icon && <span className="text-slate-400">{icon}</span>}

        <span>{value || "Not added"}</span>
      </div>
    </div>
  );
};

const ProfileLink = ({ label, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
    >
      {label}
      <ExternalLink size={13} />
    </a>
  );
};

const EmptyText = ({ text }) => {
  return <p className="text-sm text-slate-400">{text}</p>;
};

export default ProfileView;
