import React from "react";
import { useForm } from "react-hook-form";

const TaskHookForm = ({ kisiler, submitFn }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      people: []
    },
  });

  const onSubmit = (data) => {
    submitFn({
      ...data,
      id: Math.random().toString(36).substring(7),
      status: "yapılacak",
    });
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", { required: "Task başlığı yazmalısınız", minLength: { value: 3, message: "Task başlığı en az 3 karakter olmalı" } })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", { required: "Task açıklaması yazmalısınız", minLength: { value: 10, message: "Task açıklaması en az 10 karakter olmalı" } })}
        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", { required: true, validate: value => value.length >= 1 && value.length <= 3 })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people && errors.people.type === "required" ? "Lütfen en az bir kişi seçin" : "En fazla 3 kişi seçebilirsiniz"}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskHookForm;
